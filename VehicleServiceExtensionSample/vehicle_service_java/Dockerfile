FROM dockerio.int.repositories.cloud.sap/eclipse-temurin:17-jre-alpine
RUN apk update && apk add --no-cache curl
COPY target/vehicle-service-java-0.0.1-SNAPSHOT.jar vehicle-service-java.jar
CMD ["java", "-jar", "vehicle-service-java.jar"]
