pipeline {
    agent any

    environment {
        APP_SERVER = 'ubuntu@52.66.166.243'
        APP_DIR    = '/var/www/html/textronics/dam/tdst/archive'
        SERVICE    = 'viewerapp.service'
        DLL_NAME   = 'ARCHIVE_VIEWER.dll'
        VERSION    = "1.0.${BUILD_NUMBER}"
    }

    stages {

        // ─────────────────────────────────────────
        // STAGE 1 : GitHub वरून code checkout
        // ─────────────────────────────────────────
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ganesh2306/testarchive.git',
                    credentialsId: 'github-token'

                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.FULL_VERSION  = "${VERSION}-${env.GIT_COMMIT_SHORT}"
                    env.VERSIONED_ZIP = "viewerapp-${env.FULL_VERSION}.zip"
                    echo "Build Version : ${env.FULL_VERSION}"
                }
            }
        }

        // ─────────────────────────────────────────
        // STAGE 2 : Environment verify करा
        //   FIX: extra " काढला, npm global install
        // ─────────────────────────────────────────
        stage('Setup Environment') {
            steps {
                sh '''
                    echo "=== Node Version ==="
                    node -v

                    echo "=== NPM Version ==="
                    npm -v

                    echo "=== Dotnet Version ==="
                    dotnet --version
                '''
            }
        }

        // ─────────────────────────────────────────
        // STAGE 3 : Frontend Build (ClientApp)
        //   FIX: nvm use बदलून node path direct वापरतो
        //        Jenkins वर node 18 आधीच आहे
        // ─────────────────────────────────────────
        stage('Frontend Build') {
            steps {
                sh '''
                    cd ClientApp
                    npm install
                    npm run build
                '''
            }
        }

        // ─────────────────────────────────────────
        // STAGE 4 : .NET Restore
        // ─────────────────────────────────────────
        stage('Restore') {
            steps {
                sh 'dotnet restore'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 5 : Build — Release mode
        // ─────────────────────────────────────────
        stage('Build') {
            steps {
                sh 'dotnet build --configuration Release --no-restore'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 6 : Unit Tests
        // ─────────────────────────────────────────
        stage('Test') {
            steps {
                sh 'dotnet test --no-build --configuration Release'
            }
        }

        // ─────────────────────────────────────────
        // STAGE 7 : Publish → Versioned ZIP
        //   e.g. viewerapp-1.0.5-abc1f3d.zip
        // ─────────────────────────────────────────
        stage('Publish & Package') {
            steps {
                sh 'dotnet publish ARCHIVE_VIEWER.csproj --configuration Release --no-build --output ./publish'

                sh """
                    cd publish
                    zip -r ../${env.VERSIONED_ZIP} .
                    cd ..
                    echo "[OK] Package: ${env.VERSIONED_ZIP} — \$(du -sh ${env.VERSIONED_ZIP} | cut -f1)"
                """
            }
        }

        // ─────────────────────────────────────────
        // STAGE 8 : GitHub वर Git Tag push
        //   GitHub → Tags मध्ये version history दिसेल
        // ─────────────────────────────────────────
        stage('Tag Version on GitHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-token',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh """
                        git config user.email "jenkins@viewerapp.ci"
                        git config user.name  "Jenkins CI"

                        git tag -a "${env.FULL_VERSION}" \
                                -m "Release ${env.FULL_VERSION} | Build #${BUILD_NUMBER}"

                        git push https://${GIT_USER}:${GIT_TOKEN}@github.com/Ganesh2306/testarchive.git \
                                 "${env.FULL_VERSION}"

                        echo "[OK] Tag ${env.FULL_VERSION} pushed to GitHub"
                    """
                }
            }
        }

        // ─────────────────────────────────────────
        // STAGE 9 : App Server वर Deploy
        //   A) viewerapp.service STOP
        //   B) ZIP → SCP to /tmp/
        //   C) Backup जुन्या files
        //   D) Unzip नव्या files
        //   E) www-data permissions fix
        //   F) viewerapp.service START
        // ─────────────────────────────────────────
        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['app-server-ssh-key']) {

                    // A) Service STOP
                    sh """
                        ssh -o StrictHostKeyChecking=no ${APP_SERVER} \
                            'sudo systemctl stop ${SERVICE} && echo "[OK] ${SERVICE} stopped"'
                    """

                    // B) ZIP copy
                    sh """
                        scp -o StrictHostKeyChecking=no \
                            ${env.VERSIONED_ZIP} \
                            ${APP_SERVER}:/tmp/${env.VERSIONED_ZIP}
                        echo "[OK] ZIP copied to /tmp/"
                    """

                    // C) Backup + D) Unzip + E) Permissions
                    sh """
                        ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
                            set -e

                            BACKUP_DIR="${APP_DIR}/backups/${env.FULL_VERSION}"
                            sudo mkdir -p "\$BACKUP_DIR"
                            sudo find ${APP_DIR} -maxdepth 1 \
                                   -not -name "backups" \
                                   -not -name "CURRENT_VERSION" \
                                   -not -name "." \
                                   -exec cp -r {} "\$BACKUP_DIR/" \\;
                            echo "[OK] Backup: \$BACKUP_DIR"

                            sudo unzip -o /tmp/${env.VERSIONED_ZIP} -d ${APP_DIR}
                            sudo rm -f /tmp/${env.VERSIONED_ZIP}

                            sudo chown -R www-data:www-data ${APP_DIR}
                            sudo chmod -R 755 ${APP_DIR}

                            echo "${env.FULL_VERSION}" | sudo tee ${APP_DIR}/CURRENT_VERSION
                            echo "[OK] Deployed ${env.FULL_VERSION}"
                        '
                    """

                    // F) Service START
                    sh """
                        ssh -o StrictHostKeyChecking=no ${APP_SERVER} \
                            'sudo systemctl start ${SERVICE} && echo "[OK] ${SERVICE} started"'
                    """
                }
            }
        }

        // ─────────────────────────────────────────
        // STAGE 10 : Health Check
        // ─────────────────────────────────────────
        stage('Health Check') {
            steps {
                sshagent(credentials: ['app-server-ssh-key']) {
                    sh """
                        sleep 5
                        ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
                            systemctl is-active --quiet ${SERVICE} && \
                            echo "[OK] ${SERVICE} RUNNING — version: \$(cat ${APP_DIR}/CURRENT_VERSION)" || \
                            (echo "[FAIL] ${SERVICE} NOT running" && \
                             journalctl -u ${SERVICE} -n 20 --no-pager && exit 1)
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deploy SUCCESS — Version: ${env.FULL_VERSION} — Service: viewerapp.service RUNNING"
        }
        failure {
            sshagent(credentials: ['app-server-ssh-key']) {
                sh """
                    ssh -o StrictHostKeyChecking=no ${APP_SERVER} \
                        'sudo systemctl start ${SERVICE} || true && \
                         echo "[WARN] Deploy failed — recovery attempted"'
                """
            }
        }
    }
}
