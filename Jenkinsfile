pipeline {
    agent any

    environment {
        APP_SERVER = 'ubuntu@3.109.186.11'
        APP_DIR    = '/var/www/html/textronics/dam/tdst/viewer'
        SERVICE    = 'adminapp.service'
        DLL_NAME   = 'ARCHIVE_VIEWER.dll'
        VERSION    = "1.0.${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ganesh2306/testviewer.git',
                    credentialsId: 'github-token'

                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.FULL_VERSION  = "${VERSION}-${env.GIT_COMMIT_SHORT}"
                    env.VERSIONED_ZIP = "adminapp-${env.FULL_VERSION}.zip"
                    echo "Build Version : ${env.FULL_VERSION}"
                }
            }
        }

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

        stage('Frontend Build') {
            steps {
                sh '''
                    cd ClientApp
                    npm install
                    npm run build
                '''
            }
        }

        stage('Restore') {
            steps {
                sh 'dotnet restore'
            }
        }

        stage('Build') {
            steps {
                sh 'dotnet build --configuration Release --no-restore'
            }
        }

        stage('Test') {
            steps {
                sh 'dotnet test --no-build --configuration Release'
            }
        }

        stage('Publish & Package') {
            steps {
                // ✅ FIX: ARCHIVE_VIEWER → ARCHIVE_DASHBOARD
                sh 'dotnet publish ARCHIVE_VIEWER.csproj --configuration Release --no-build --output ./publish'

                sh """
                    cd publish
                    zip -r ../${env.VERSIONED_ZIP} .
                    cd ..
                    echo "[OK] Package: ${env.VERSIONED_ZIP} — \$(du -sh ${env.VERSIONED_ZIP} | cut -f1)"
                """
            }
        }

        stage('Tag Version on GitHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-token',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh """
                        git config user.email "jenkins@adminapp.ci"
                        git config user.name  "Jenkins CI"
                        git tag -a "${env.FULL_VERSION}" \
                                -m "Release ${env.FULL_VERSION} | Build #${BUILD_NUMBER}"
                        git push https://\${GIT_USER}:\${GIT_TOKEN}@github.com/Ganesh2306/testviewer.git \
                                 "${env.FULL_VERSION}"
                        echo "[OK] Tag ${env.FULL_VERSION} pushed to GitHub"
                    """
                }
            }
        }

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
                                   -not -name "viewer" \
                                   -not -name "." \
                                   -exec cp -r {} "\$BACKUP_DIR/" \\;
                            echo "[OK] Backup: \$BACKUP_DIR"

                            sudo unzip -o /tmp/${env.VERSIONED_ZIP} -d ${APP_DIR}
                            sudo rm -f /tmp/${env.VERSIONED_ZIP}

                            sudo chown -R www-data:www-data ${APP_DIR}
                            sudo chmod -R 755 ${APP_DIR}

                            echo "${env.FULL_VERSION}" | sudo tee ${APP_DIR}/CURRENT_VERSION
                            echo "[OK] Deployed ${env.FULL_VERSION} to ${APP_DIR}"
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
            echo "✅ Deploy SUCCESS — Version: ${env.FULL_VERSION} — adminapp.service RUNNING"
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
