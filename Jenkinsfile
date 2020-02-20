def remote = [:]
remote.name = 'test'
remote.host = 'ppt-server'
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
                sh 'docker exec ppt-server mv /home/testsite/node_modules /home/node_modules'
                sh 'docker exec ppt-server rm -rf /home/testsite/*'
                sh 'docker cp /var/jenkins_home/workspace/pina-webtest-staging_master/. ppt-server:/home/testsite/.'
                sh 'docker exec ppt-server mv /home/node_modules/ /home/testsite/node_modules'
                sshCommand remote: remote, command: "k6 run loadtests/performance-test.js"
                sshCommand remote: remote, command: "cd /home/testsite && npm install && npm run pinaa"
            }
        }
    }
    post { 
        success {
            sshCommand remote: remote, command: "cd /home/testsite/Renders/jest-stare && ls && git init && git remote add pinaio https://github.com/alfajri31/pina.github.io.git && git push commit -m 'update-euy' && git push pinaio master && git remote remove pinaio"
            echo 'I succeeeded!'
        }
        unstable {
            sshCommand remote: remote, command: "cd /home/testsite/Renders/jest-stare && ls && git init && git remote add pinaio https://github.com/alfajri31/pina.github.io.git && git push commit -m 'update-euy' && git push pinaio master && git remote remove pinaio"
            echo 'I am unstable :/'
        }
        failure {
            sshCommand remote: remote, command: "cd /home/testsite/Renders/jest-stare && ls && git init && git remote add pinaio https://github.com/alfajri31/pina.github.io.git && git push commit -m 'update-euy' && git push pinaio master && git remote remove pinaio"
            mail bcc: '', body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: https://alfajri31.github.io/pina.github.io/", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "muhammad.fajri@mirumagency.com";
        }
    }
}