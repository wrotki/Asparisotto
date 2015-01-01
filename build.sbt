name := """Asparisotto"""

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  "org.webjars" % "angularjs" % "1.3.0-beta.2",
  "org.webjars" % "requirejs" % "2.1.11-1",
  "org.webjars" % "bootstrap" % "3.2.0",
  "org.webjars" % "three.js" % "r66"
)     


// https://developer.salesforce.com/blogs/developer-relations/2014/07/building-single-page-app-angularjs-salesforce-rest-api.html?d=70130000000llMA&elq_mid=6929&elq_cid=3310046
// http://www.warski.org/blog/2014/05/spray-server-docker-container/


lazy val root = (project in file(".")).enablePlugins(PlayScala)

pipelineStages := Seq(rjs, digest, gzip)
