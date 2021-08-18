package models.config.sections

import com.beust.klaxon.Json
import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleIntegerProperty
import javafx.beans.property.SimpleStringProperty
import tornadofx.ItemViewModel

data class XMRigConfigHttp(
    var enabled: Boolean = false,
    var host:String = "127.0.0.1",
    var port: Int = 8080,
    @Json(name = "access-token")
    var accessToken: String? = null,
    var restricted: Boolean = true
)

class XMRigConfigHttpModel(data:XMRigConfigHttp? = null) : ItemViewModel<XMRigConfigHttp>(data) {
    val enabledProp = bind { SimpleBooleanProperty(item.enabled, "") }
    val hostProp = bind { SimpleStringProperty(item.host, "") }
    val portProp = bind { SimpleIntegerProperty(item.port, "") }
    val accessTokenProp = bind { SimpleStringProperty(item?.accessToken, "") }
    val restrictedProp = bind { SimpleBooleanProperty(item.restricted, "") }

    init {
        if (data != null) {
            sync()
        }
    }

    fun sync() {
        enabledProp.value = item.enabled
        hostProp.value = item.host
        portProp.value = item.port
        accessTokenProp.value = item.accessToken
        restrictedProp.value = item.restricted
    }

    override fun onCommit() {
        with (item) {
            enabled = enabledProp.value
            host = hostProp.value
            port = portProp.value
            accessToken = accessTokenProp.value
            restricted = restrictedProp.value
        }
    }
}