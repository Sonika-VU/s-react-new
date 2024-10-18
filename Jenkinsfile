pipeline {
    agent any
    options {
        timeout(time: 14, unit: 'MINUTES') // General job timeout, not specific to Git
    }
    environment {
        SPRING_BOOT_REPO = 'https://github.com/bharatchhajer/project-retail-store-sb-restful-hateoas-hiber-sec-mysql.git'
    }

    stages {

        stage('Build and Package Spring Boot App') {
            steps {
                script {
                   // dir("${env.SPRING_BOOT_DIR}") {
                        // Run Maven to build the Spring Boot app
                        echo 'Building Spring Boot App...'
                        bat 'mvn clean package -DskipTests'
                  //  }
                }
            }
        }

        stage('Run Both Applications') {
            parallel {
                stage('Run Spring Boot Backend') {
                    steps {
                        script {
                         //   dir("${env.SPRING_BOOT_DIR}") {
                                // Run the Spring Boot application in the background
                                echo 'Starting Spring Boot backend...'
                                //powershell 'java -jar target/project-retail-store-sb-restful-hateoas-hiber-sec-mysql-0.0.1-SNAPSHOT.jar | Tee-Object -FilePath app-back.log'
                                powershell '''  
                                Start-Process -FilePath "java" -ArgumentList "-jar target/project-retail-store-sb-restful-hateoas-hiber-sec-mysql-0.0.1-SNAPSHOT.jar" -NoNewWindow -RedirectStandardOutput "app-front.log" -RedirectStandardError "app-error.log"  
                                '''
                         //   }
                        }
                    }
                }

            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
