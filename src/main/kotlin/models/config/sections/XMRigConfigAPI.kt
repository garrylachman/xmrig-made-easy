package models.config.sections

import com.beust.klaxon.Json
import javafx.beans.property.SimpleStringProperty
import tornadofx.ItemViewModel

data class XMRigConfigApi(
    var id: String? = null,
    @Json(name = "worker-id")
    var workerId: String? = null
)

class XMRigConfigApiModel(data:XMRigConfigApi? = null) : ItemViewModel<XMRigConfigApi>(data) {
    val idProp = bind { SimpleStringProperty(item?.id, "") }
    val workerIdProp = bind { SimpleStringProperty(item?.workerId, "") }

    init {
        if (data != null) {
            sync()
        }
    }

    fun sync() {
        idProp.value = item.id
        workerIdProp.value = item.workerId
    }

    override fun onCommit() {
        with (item) {
            id = idProp.value
            workerId = workerIdProp.value
        }
    }
}