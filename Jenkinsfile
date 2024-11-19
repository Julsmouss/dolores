pipeline {
    agent any

    stages {
        stage('Build') {
            steps{
                echo 'Run build'
            }
        }
        stage('Code Analysis') {
            steps{
                echo 'Run code analysis'
            }
        }
        stage('Test') {
            steps{
                echo 'Run test'
            }
        }
        stage('Deploy') {
            steps{
                sh 'docker-compose up -d'
            }
        }
    }
}
