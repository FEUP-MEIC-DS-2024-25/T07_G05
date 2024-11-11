plugins {
    id("java")
    id("info.solidsoft.pitest") version "1.15.0"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    pitest("org.pitest:pitest-junit5-plugin:1.2.1")

}

tasks.test {
    useJUnitPlatform()
}

pitest {
    pitestVersion.set("1.9.0")
    targetClasses.set(listOf("com.example.*"))
    targetTests.set(listOf("com.example.*"))
    threads.set(4)
    outputFormats.set(listOf("HTML", "XML"))
}
