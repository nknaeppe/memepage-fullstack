#FROM openjdk:19-jdk-alpine
#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring
#ARG DEPENDENCY=build
#RUN echo ${DEPENDENCY}
#COPY ${DEPENDENCY}/libs/*.jar /app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]


FROM openjdk:19-jdk-alpine
ARG JAR_FILE
COPY ${JAR_FILE} /app.jar
RUN apk --no-cache add curl bash bind-tools
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]