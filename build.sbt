name := """Asparisotto"""

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.2"

libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.3.0-2",
  "org.webjars" % "angularjs" % "1.3.0-beta.2",
  "org.webjars" % "requirejs" % "2.1.11-1",
  "org.webjars" % "bootstrap" % "3.2.0"
)

pipelineStages := Seq(rjs,digest, gzip)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

// https://developer.salesforce.com/blogs/developer-relations/2014/07/building-single-page-app-angularjs-salesforce-rest-api.html?d=70130000000llMA&elq_mid=6929&elq_cid=3310046
// http://www.warski.org/blog/2014/05/spray-server-docker-container/
//"org.webjars" % "rxjs" % "2.3.13",
//"org.webjars" % "rxjs-jquery" % "1.1.6",
//"org.webjars" % "three.js" % "r66"
//"org.webjars" % "jquery" % "2.1.3"
//
