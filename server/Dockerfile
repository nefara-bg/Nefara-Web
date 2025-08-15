FROM openjdk:17-jdk-slim

ENV SPRING_PROFILES_ACTIVE=prod
WORKDIR /app

COPY target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
