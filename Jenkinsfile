pipeline {
    agent any

    environment {
        DOCKER_PATH = 'C:/Program Files/Docker/Docker/resources/bin/docker'
        EMAIL_RECIPIENT = 'pruebas854@outlook.com'  
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
                bat "\"${DOCKER_PATH}\" build -t docker-pipeline:latest ."
            }
        }
    }
    post {
        success {
            // Enviar correo electrónico cuando el build y los tests son exitosos
            emailext (
                subject: "Jenkins: El build fue exitoso",
                body: "El build y las pruebas han sido completados con éxito.",
                to: "${EMAIL_RECIPIENT}"
            )
        }
        failure {
            // Enviar correo electrónico si el build o las pruebas fallan
            emailext (
                subject: "Jenkins: El build falló",
                body: "El build o las pruebas han fallado. Revisa los logs para más detalles.",
                to: "${EMAIL_RECIPIENT}"
            )
        }
        unstable {
            // Enviar correo electrónico si el build es inestable
            emailext (
                subject: "Jenkins: El build es inestable",
                body: "El build está en un estado inestable, revisa los resultados de las pruebas.",
                to: "${EMAIL_RECIPIENT}"
            )
        }
        always {
            // Enviar correo electrónico siempre, sin importar el resultado
            emailext (
                subject: "Jenkins: Notificación de finalización del build",
                body: "El proceso de build ha terminado. Revisa los logs para más detalles.",
                to: "${EMAIL_RECIPIENT}"
            )
        }
    }
}
