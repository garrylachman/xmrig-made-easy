package models.config.sections

import com.beust.klaxon.Json
import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleIntegerProperty
import javafx.beans.property.SimpleStringProperty
import tornadofx.ItemViewModel

data class XMRigConfigRandomX(
    @Json(name = "init")
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

class XMRigConfigRandomXModel(data:XMRigConfigRandomX? = null) : ItemViewModel<XMRigConfigRandomX>(data) {
    val initRandomXProp = bind { SimpleIntegerProperty(item.initRandomX, "") }
    val initAvx2Prop = bind { SimpleIntegerProperty(item.initAvx2, "") }
    val modeProp = bind { SimpleStringProperty(item?.mode, "") }
    val oneGBPagesProp = bind { SimpleBooleanProperty(item.oneGBPages, "") }
    val rdmsrProp = bind { SimpleBooleanProperty(item.rdmsr, "") }
    val wrmsrProp = bind { SimpleBooleanProperty(item.wrmsr, "") }
    val cache_qosProp = bind { SimpleBooleanProperty(item.cache_qos, "") }
    val numaProp = bind { SimpleBooleanProperty(item.numa, "") }
    val scratchpad_prefetch_modeProp = bind { SimpleIntegerProperty(item.scratchpad_prefetch_mode, "") }

    init {
        if (data != null) {
            sync()
        }
    }

    fun sync() {
        initRandomXProp.value = item.initRandomX
        initAvx2Prop.value = item.initAvx2
        modeProp.value = item.mode
        oneGBPagesProp.value = item.oneGBPages
        rdmsrProp.value = item.rdmsr
        wrmsrProp.value = item.wrmsr
        cache_qosProp.value = item.cache_qos
        numaProp.value = item.numa
        scratchpad_prefetch_modeProp.value = item.scratchpad_prefetch_mode
    }

    override fun onCommit() {
        with (item) {
            initRandomX = initRandomXProp.value
            initAvx2 = initAvx2Prop.value
            mode = modeProp.value
            oneGBPages = oneGBPagesProp.value
            rdmsr = rdmsrProp.value
            wrmsr = wrmsrProp.value
            cache_qos = cache_qosProp.value
            numa = numaProp.value
            scratchpad_prefetch_mode = scratchpad_prefetch_modeProp.value
        }
    }
}