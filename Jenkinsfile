pipeline {
    agent any

    environment {
        DOCKER_PATH = 'C:\Program Files\Docker\Docker\resources\bin\docker'
    }

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
                sh '${DOCKER_PATH} build -t docker-pipeline:latest '
            }
        }
    }
}
