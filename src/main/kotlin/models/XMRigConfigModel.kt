package models

import com.beust.klaxon.Json
import com.beust.klaxon.Klaxon
import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleIntegerProperty
import javafx.beans.property.SimpleStringProperty
import tornadofx.ItemViewModel
import tornadofx.rebind
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


class XMRigConfigModel() : ItemViewModel<XMRigConfig>() {

    var jsonFileName: String = "";

    val autosaveProp = bind { SimpleBooleanProperty(item?.autosave, "") }
    val backgroundProp = bind { SimpleBooleanProperty(item?.background, "") }
    val titleProp = bind { SimpleBooleanProperty(item?.title, "") }
    val colorsProp = bind { SimpleBooleanProperty(item?.colors, "") }
    val donateLevelProp = bind { SimpleIntegerProperty(item?.donateLevel, "") }
    val donateOverProxyProp = bind { SimpleIntegerProperty(item?.donateOverProxy, "") }
    val dmiProp = bind { SimpleBooleanProperty(item?.dmi, "") }
    val retriesProp = bind { SimpleIntegerProperty(item?.retries, "") }
    val retryPauseProp = bind { SimpleIntegerProperty(item?.retryPause, "") }
    val sysLogProp = bind { SimpleBooleanProperty(item?.sysLog, "") }
    val userAgentProp = bind { SimpleStringProperty(item?.userAgent, "") }
    val verboseProp = bind { SimpleIntegerProperty(item?.verbose, "") }
    val watchProp = bind { SimpleBooleanProperty(item?.watch, "") }
    val pauseOnBatteryProp = bind { SimpleBooleanProperty(item?.pauseOnBattery, "") }
    val pauseOnActiveProp = bind { SimpleBooleanProperty(item?.pauseOnActive, "") }

    init {
        item = XMRigConfig()
        rebindOnChange(itemProperty)
    }

    fun setFile(file: String) {
        jsonFileName = file
        if (jsonFileName != "" && isFileExists(jsonFileName)) {
            val fileContent: String = readFileDirectlyAsText(jsonFileName);
            item = Klaxon().parse<XMRigConfig>(fileContent)
        }

        autosaveProp.value = item.autosave
        backgroundProp.value = item.background
        titleProp.value = item.title
        colorsProp.value = item.colors
        donateLevelProp.value = item.donateLevel
        donateOverProxyProp.value = item.donateOverProxy
        dmiProp.value = item.dmi
        retriesProp.value = item.retries
        retryPauseProp.value = item.retryPause
        sysLogProp.value = item.sysLog
        userAgentProp.value = item.userAgent
        verboseProp.value = item.verbose
        watchProp.value = item.watch
        pauseOnBatteryProp.value = item.pauseOnBattery
        pauseOnActiveProp.value = item.pauseOnActive



    }

    override fun onCommit() {
        if (jsonFileName == "") {
            return;
        }
        println("on Commit")

        with (item) {
            autosave = autosaveProp.value
            background = backgroundProp.value
            title = titleProp.value
            colors = colorsProp.value
            donateLevel = donateLevelProp.value
            donateOverProxy = donateOverProxyProp.value
            dmi = dmiProp.value
            retries = retriesProp.value
            retryPause = retryPauseProp.value
            sysLog = sysLogProp.value
            userAgent = userAgentProp.value
            verbose = verboseProp.value
            watch = watchProp.value
            pauseOnBattery = pauseOnBatteryProp.value
            pauseOnActive = pauseOnActiveProp.value
        }
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