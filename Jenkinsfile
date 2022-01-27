pipeline{
    agent any

    tools {nodejs "node"}

    stages{
        stage('Cypress Parallel Test Suite'){
            parallel{
                stage('Slave Node1'){
                    agent{
                        label "remote_node1"
                    }
                    steps{
                        git url:'https://github.com/stianega/juice-shop.git'
                        sh 'NO_COLOR=1 npm install'
                        sh 'NO_COLOR=1 npm update'
                        //sh 'npm start & npx wait-on http://localhost:3000'
                        sh "CYPRESS_API_URL=\"http://localhost:1234/\" npx cy2 run --record --key XXX --parallel --ci-build-id env.BUILD_ID"
                    }
                }
                stage('Slave Node2'){
                    agent{
                        label "remote_node2"
                    }
                    steps{
                        git url:'https://github.com/stianega/juice-shop.git'
                        sh 'NO_COLOR=1 npm install'
                        sh 'NO_COLOR=1 npm update'
                        //sh 'npm start & npx wait-on http://localhost:3000'
                        sh "CYPRESS_API_URL=\"http://localhost:1234/\" npx cy2 run --record --key XXX --parallel --ci-build-id env.BUILD_ID"
                    }
                }
            }
        }
    }
}