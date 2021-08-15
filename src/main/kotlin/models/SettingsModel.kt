package models

import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleStringProperty
import tornadofx.*

data class Settings(
    val workingDir: String,
    val xmrigBinaryPath: String,
    val configFileName: String,
    val enableStats: Boolean
    )

class SettingsModel : ItemViewModel<Settings>() {
    private val KEY_WORKING_DIR = "workingDir"
    private val KEY_CONFIG_FILE_NAME = "configFileName"
    private val KEY_ENABLE_STATS = "enableStats"
    private val KEY_XMRIG_BIN_PATH = "xmrigBinPath"

    val workingDir = bind { SimpleStringProperty(item?.workingDir, "", config.string(KEY_WORKING_DIR)) }
    val configFileName = bind { SimpleStringProperty(item?.configFileName, "", config.string(KEY_CONFIG_FILE_NAME)) }
    val xmrigBinaryPath = bind { SimpleStringProperty(item?.xmrigBinaryPath, "", config.string(KEY_XMRIG_BIN_PATH)) }
    val enableStats = bind { SimpleBooleanProperty(item?.enableStats, "") }

    override fun onCommit() {
        with(config) {
            set(KEY_WORKING_DIR to workingDir.value)
            set(KEY_CONFIG_FILE_NAME to configFileName.value)
            set(KEY_ENABLE_STATS to enableStats.value)
            set(KEY_XMRIG_BIN_PATH to xmrigBinaryPath.value)
            save()
        }
    }
}
