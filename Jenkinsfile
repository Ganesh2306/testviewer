// pipeline {
//     agent any

//     // ─────────────────────────────────────────────────────
//     // तुमच्या service file मधील exact values:
//     //   WorkingDirectory = /var/www/html/textronics/dam/tdst/archive
//     //   ExecStart        = /usr/bin/dotnet ARCHIVE_VIEWER.dll
//     //   User             = www-data
//     //   Server IP        = 3.109.40.92
//     // ─────────────────────────────────────────────────────
//     environment {
//         APP_SERVER   = 'ubuntu@13.233.124.148'
//         APP_DIR      = '/var/www/html/textronics/dam/tdst/archive'
//         SERVICE      = 'viewerapp.service'
//         DLL_NAME     = 'ARCHIVE_VIEWER.dll'
//         GITHUB_REPO  = 'https://github.com/Ganesh2306/testarchive.git'
//         VERSION      = "1.0.${BUILD_NUMBER}"
//     }

//     stages {

//         // ─────────────────────────────────────────
//         // STAGE 1 : GitHub वरून code checkout
//         // ─────────────────────────────────────────
//         stage('Checkout') {
//             steps {
//                 git branch: 'main',
//                     url: "${GITHUB_REPO}",
//                     credentialsId: 'github-token'

//                 script {
//                     // Short commit hash capture करा
//                     env.GIT_COMMIT_SHORT = sh(
//                         script: 'git rev-parse --short HEAD',
//                         returnStdout: true
//                     ).trim()

//                     // Full version बनव: v1.0.42-abc1f3d
//                     env.FULL_VERSION  = "${VERSION}-${env.GIT_COMMIT_SHORT}"
//                     env.VERSIONED_ZIP = "viewerapp-${env.FULL_VERSION}.zip"

//                     echo "========================================="
//                     echo " Build Version : ${env.FULL_VERSION}"
//                     echo " Package Name  : ${env.VERSIONED_ZIP}"
//                     echo " App Server    : ${APP_SERVER}"
//                     echo " Deploy Path   : ${APP_DIR}"
//                     echo "========================================="
//                 }
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 2 : Restore NuGet packages
//         // ─────────────────────────────────────────
//         stage('Restore') {
//             steps {
//                 sh 'dotnet restore'
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 3 : Build — Release mode
//         // ─────────────────────────────────────────
//         stage('Build') {
//             steps {
//                 sh 'dotnet build --configuration Release --no-restore'
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 4 : Unit Tests
//         // ─────────────────────────────────────────
//         stage('Test') {
//             steps {
//                 sh 'dotnet test --no-build --configuration Release --verbosity normal'
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 5 : Publish → Versioned ZIP बनव
//         //   ARCHIVE_VIEWER.dll आणि सर्व files
//         //   → viewerapp-v1.0.42-abc1f3d.zip मध्ये pack
//         // ─────────────────────────────────────────
//         stage('Publish & Package') {
//             steps {
//                 sh 'dotnet publish --configuration Release --no-build --output ./publish'

//                 script {
//                     sh """
//                         cd publish

//                         # DLL तयार आहे का verify करा
//                         ls -lh ${DLL_NAME}

//                         # Versioned ZIP बनव
//                         zip -r ../${env.VERSIONED_ZIP} .
//                         cd ..

//                         echo "[OK] Package ready: ${env.VERSIONED_ZIP}"
//                         echo "[OK] Size: \$(du -sh ${env.VERSIONED_ZIP} | cut -f1)"
//                     """
//                 }
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 6 : GitHub वर Git Tag push करा
//         //   GitHub → Tags मध्ये दिसेल
//         //   e.g. v1.0.42-abc1f3d
//         // ─────────────────────────────────────────
//         stage('Tag Version on GitHub') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'github-token',
//                     usernameVariable: 'GIT_USER',
//                     passwordVariable: 'GIT_TOKEN'
//                 )]) {
//                     sh """
//                         git config user.email "jenkins@viewerapp.ci"
//                         git config user.name  "Jenkins CI"

//                         # Annotated tag बनव
//                         git tag -a "${env.FULL_VERSION}" \
//                                 -m "Release ${env.FULL_VERSION} | Build #${BUILD_NUMBER} | Jenkins Auto-Deploy"

//                         # GitHub वर push करा
//                         git push https://${GIT_USER}:${GIT_TOKEN}@github.com/Ganesh2306/testarchive.git \
//                                  "${env.FULL_VERSION}"

//                         echo "[OK] Tag ${env.FULL_VERSION} pushed to GitHub"
//                     """
//                 }
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 7 : App Server (3.109.40.92) वर Deploy
//         //
//         //   A) viewerapp.service → STOP
//         //   B) ZIP → SCP copy to APP_DIR
//         //   C) जुन्या files → backups/ मध्ये save
//         //   D) नव्या files → unzip
//         //   E) www-data permissions fix
//         //   F) viewerapp.service → START
//         // ─────────────────────────────────────────
//         stage('Deploy to EC2') {
//             steps {
//                 sshagent(credentials: ['app-server-ssh-key']) {

//                     // A) Service STOP
//                     sh """
//                         ssh -o StrictHostKeyChecking=no ${APP_SERVER} \
//                             'sudo systemctl stop ${SERVICE} && \
//                              echo "[OK] ${SERVICE} stopped"'
//                     """

//                     // B) ZIP copy करा App Server वर
//                     sh """
//                         scp -o StrictHostKeyChecking=no \
//                             ${env.VERSIONED_ZIP} \
//                             ${APP_SERVER}:/tmp/${env.VERSIONED_ZIP}
//                         echo "[OK] ${env.VERSIONED_ZIP} copied to /tmp/"
//                     """

//                     // C) Backup + D) Unzip + E) Permissions
//                     sh """
//                         ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
//                             set -e

//                             # C) जुन्या files backup करा (rollback साठी)
//                             BACKUP_DIR="${APP_DIR}/backups/${env.FULL_VERSION}"
//                             sudo mkdir -p "\$BACKUP_DIR"
//                             sudo find ${APP_DIR} -maxdepth 1 \
//                                    -not -name "backups" \
//                                    -not -name "CURRENT_VERSION" \
//                                    -not -name "." \
//                                    -exec cp -r {} "\$BACKUP_DIR/" \\;
//                             echo "[OK] Backup saved: \$BACKUP_DIR"

//                             # D) नव्या files APP_DIR मध्ये unzip करा
//                             sudo unzip -o /tmp/${env.VERSIONED_ZIP} -d ${APP_DIR}
//                             sudo rm -f /tmp/${env.VERSIONED_ZIP}

//                             # ARCHIVE_VIEWER.dll तयार आहे का verify
//                             ls -lh ${APP_DIR}/${DLL_NAME}

//                             # E) www-data user ला permissions द्या
//                             #    (service User=www-data आहे म्हणून)
//                             sudo chown -R www-data:www-data ${APP_DIR}
//                             sudo chmod -R 755 ${APP_DIR}

//                             # Currently running version track करा
//                             echo "${env.FULL_VERSION}" | sudo tee ${APP_DIR}/CURRENT_VERSION
//                             echo "[OK] Deployed ${env.FULL_VERSION} to ${APP_DIR}"
//                         '
//                     """

//                     // F) Service START
//                     sh """
//                         ssh -o StrictHostKeyChecking=no ${APP_SERVER} \
//                             'sudo systemctl start ${SERVICE} && \
//                              echo "[OK] ${SERVICE} started"'
//                     """
//                 }
//             }
//         }

//         // ─────────────────────────────────────────
//         // STAGE 8 : Health Check
//         //   viewerapp.service active आहे का?
//         //   ARCHIVE_VIEWER.dll process चालू आहे का?
//         // ─────────────────────────────────────────
//         stage('Health Check') {
//             steps {
//                 sshagent(credentials: ['app-server-ssh-key']) {
//                     sh """
//                         sleep 5
//                         ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
//                             echo "--- Service Status ---"
//                             systemctl is-active --quiet ${SERVICE} && \
//                             echo "[OK] ${SERVICE} is RUNNING" || \
//                             (echo "[FAIL] ${SERVICE} is NOT running" && \
//                              echo "--- Last 20 logs ---" && \
//                              journalctl -u ${SERVICE} -n 20 --no-pager && \
//                              exit 1)

//                             echo "--- Running Version ---"
//                             cat ${APP_DIR}/CURRENT_VERSION

//                             echo "--- Process Check ---"
//                             pgrep -a dotnet | grep ARCHIVE_VIEWER && \
//                             echo "[OK] ARCHIVE_VIEWER.dll process is running"
//                         '
//                     """
//                 }
//             }
//         }
//     }

//     // ─────────────────────────────────────────────
//     // POST : Success / Failure handling
//     // ─────────────────────────────────────────────
//     post {
//         success {
//             echo """
//             ╔══════════════════════════════════════════════════╗
//             ║   Deploy SUCCESS                                 ║
//             ║   Version : ${env.FULL_VERSION}
//             ║   Server  : 3.109.40.92                          ║
//             ║   Path    : /var/www/html/textronics/...archive  ║
//             ║   Service : viewerapp.service — RUNNING          ║
//             ║   Tag     : pushed to GitHub                     ║
//             ╚══════════════════════════════════════════════════╝
//             """
//         }
//         failure {
//             // Deploy fail झाल्यास service recover करण्याचा प्रयत्न
//             sshagent(credentials: ['app-server-ssh-key']) {
//                 sh """
//                     ssh -o StrictHostKeyChecking=no ${APP_SERVER} \
//                         'sudo systemctl start ${SERVICE} || true && \
//                          echo "[WARN] Deploy failed — service recovery attempted"'
//                 """
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        APP_SERVER   = 'ubuntu@13.233.124.148'
        APP_DIR      = '/var/www/html/textronics/dam/tdst/archive'
        SERVICE      = 'viewerapp.service'
        DLL_NAME     = 'ARCHIVE_VIEWER.dll'
        VERSION      = "1.0.${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ganesh2306/testarchive.git',
                    credentialsId: 'github-token'
            }
        }

        // 🔥 FIXED ENVIRONMENT (NO nvm error)
        stage('Setup Environment') {
            steps {
                sh '''
                echo 'Node Version:'
                node -v

                echo 'NPM Version:'
                npm -v

                echo 'Dotnet Version:'
                dotnet --version
                "
                '''
            }
        }

        // 🔥 FRONTEND BUILD (FIXED)
        stage('Frontend Build') {
            steps {
                sh '''
                bash -c "
                export NVM_DIR='/var/lib/jenkins/.nvm'
                source \$NVM_DIR/nvm.sh
                nvm use 14.17.6

                cd ClientApp
                npm install
                npm run build
                "
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
                sh 'dotnet publish ARCHIVE_VIEWER.csproj --configuration Release --no-build --output ./publish'

                sh '''
                cd publish
                zip -r ../app.zip .
                cd ..
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['app-server-ssh-key']) {

                    sh "ssh -o StrictHostKeyChecking=no ${APP_SERVER} 'sudo systemctl stop ${SERVICE}'"

                    sh "scp -o StrictHostKeyChecking=no app.zip ${APP_SERVER}:/tmp/"

                    sh """
                    ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
                        sudo unzip -o /tmp/app.zip -d ${APP_DIR}
                        sudo rm -f /tmp/app.zip
                        sudo systemctl start ${SERVICE}
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS BUILD"
        }
        failure {
            echo "❌ BUILD FAILED"
        }
    }
}