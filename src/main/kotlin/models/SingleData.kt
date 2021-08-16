package models

import com.beust.klaxon.Klaxon
import tornadofx.toProperty

object SingleData {
    val settings = SettingsModel()
    val config = XMRigConfigModel()

    init {
        handleConfigPathChange()
        settings.workingDir.addListener { e ->handleConfigPathChange() }
        settings.configFileName.addListener { e -> handleConfigPathChange() }
        config.item.autosave.toProperty().addListener { e -> printDebug() }
    }

    fun printDebug() {
        println(Klaxon().toJsonString(config.item))
    }

    private fun handleConfigPathChange() {
        println("handleConfigPathChange")
        if (settings.workingDir.value.isNotEmpty() && settings.configFileName.value.isNotEmpty())   {
            val configFile = StringBuilder().append(settings.workingDir.value).append("/").append(settings.configFileName.value);
            config.setFile(configFile.toString())
        }

        println(Klaxon().toJsonString(config.item))
    }

}