def remote = [:]
remote.name = 'test'
remote.host = 'web2'
remote.user = 'remote_user'
remote.password = '1234'
remote.allowAnyHosts = true
pipeline {
    agent any
    stages {
        stage('Example') {
            agent {
                docker { image 'jenkins/docker' }
            }
            steps {
                sh 'docker exec web2 mv /home/testsite/node_modules /home/node_modules'
                sh 'docker exec web2 rm -rf /home/testsite'
                sh 'docker cp /var/jenkins_home/workspace/testsite web2:/home/testsite'
                sh 'docker exec web2 mv /home/node_modules/ /home/testsite/node_modules'
                sshCommand remote: remote, command: "cd /home/testsite && npm install && npm run pinaa && cd /Renders/jest-stare && git init && git add . && git commit -m 'update' && git remote add testio https://github.com/alfajri31/pina.github.io.git && git push testio master"
            }
        }
    }
    post { 
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            mail bcc: '', body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: https://alfajri31.github.io/pina.github.io/", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "muhammad.fajri@mirumagency.com";
        }
    }
}