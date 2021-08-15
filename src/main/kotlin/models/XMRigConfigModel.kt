package models

import com.beust.klaxon.Json
import com.beust.klaxon.Klaxon
import tornadofx.ItemViewModel
import tornadofx.rebindOnChange
import java.io.File

data class XMRigConfigApi(
    var id: String? = null,
    @Json(name = "worker-id")
    var workerId: String? = null
)

data class XMRigConfigHttp(
    var enabled: Boolean = false,
    var host:String = "127.0.0.1",
    var port: Int = 8080,
    @Json(name = "access-token")
    var accessToken: String? = null,
    var restricted: Boolean = true
)

data class XMRigConfigRandomX(
    @Json (name = "init")
    var initRandomX: Int = -1,
    @Json(name = "init-avx2")
    var initAvx2: Int = -1,
    var mode: String = "auto",
    @Json(name = "1gb-pages")
    var oneGBPages: Boolean = false,
    var rdmsr: Boolean = true,
    var wrmsr: Boolean = true,
    var cache_qos: Boolean = false,
    var numa: Boolean = true,
    var scratchpad_prefetch_mode: Int = 1
)

data class XMRigConfig(
    var api: XMRigConfigApi = XMRigConfigApi(),
    var http: XMRigConfigHttp = XMRigConfigHttp(),
    var randomx: XMRigConfigRandomX = XMRigConfigRandomX(),
    var autosave: Boolean = true,
    var background: Boolean = false,
    var colors: Boolean = true,
    var title: Boolean = true,
    @Json(name = "donate-level")
    var donateLevel: Int = 1,
    @Json(name = "donate-over-proxy")
    var donateOverProxy: Int = 1,
    @Json(name = "log-file")
    var logFile: String? = null,
    @Json(name = "print-time")
    var printTime: Int = 60,
    @Json(name = "health-print-time")
    var healthPrintTime: Int = 60,
    var dmi: Boolean = true,
    var retries: Int = 5,
    @Json(name = "retry-pause")
    var retryPause: Int = 5,
    var sysLog: Boolean = false,
    @Json(name = "user-agent")
    var userAgent: String? = null,
    var verbose: Int = 0,
    var watch: Boolean = true,
    @Json(name = "pause-on-battery")
    var pauseOnBattery: Boolean = false,
    @Json(name = "pause-on-active")
    var pauseOnActive: Boolean = false
)



class XMRigConfigModel(file: String) : ItemViewModel<XMRigConfig>() {

    val jsonFileName: String = file

    init {
        println(jsonFileName)
        if (isFileExists(jsonFileName)) {
            val fileContent: String = readFileDirectlyAsText(jsonFileName);
            item = Klaxon().parse<XMRigConfig>(fileContent)
        } else {
            item = XMRigConfig()
        }
        rebindOnChange(itemProperty)
        commit()
    }

    override fun onCommit() {
        println("on Commit")
        println(Klaxon().toJsonString(item))
        File(jsonFileName).writeText(Klaxon().toJsonString(item))
    }

    fun readFileDirectlyAsText(fileName: String): String {
        return File(fileName).readText(Charsets.UTF_8)
    }

    fun isFileExists(fileName: String): Boolean {
        return  File(fileName).exists()
    }

}
