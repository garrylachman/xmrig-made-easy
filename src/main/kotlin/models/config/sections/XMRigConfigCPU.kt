package models.config.sections

import com.beust.klaxon.Json
import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleIntegerProperty
import javafx.beans.property.SimpleStringProperty
import tornadofx.ItemViewModel

data class XMRigConfigCPU(
    var enabled: Boolean = true,
    @Json(name = "huge-pages")
    var hugePages: Boolean = true,
    @Json(name = "huge-pages-jit")
    var hugePagesJit: Boolean = false,
    @Json(name = "hw-aes")
    var hwAes: Boolean? = null,
    var priority: Int? = null,
    @Json(name = "memory-pool")
    var memoryPool: Boolean = false,
    var yield: Boolean = true,
    @Json(name = "max-threads-hint")
    var maxThreadsHint: Int = 100,
    var asm: Any = true,
    @Json(name = "argon2-impl")
    var argon2Impl: String? = null,
    @Json(name = "astrobwt-max-size")
    var astrobwtMaxSize: Int = 550,
    @Json(name = "astrobwt-avx2")
    var astrobwtAvx2: Boolean = false
)

class XMRigConfigCPUModel(data:XMRigConfigCPU? = null) : ItemViewModel<XMRigConfigCPU>(data) {
    val enabledProp = bind { SimpleBooleanProperty(item.enabled, "") }
    val hugePagesProp = bind { SimpleBooleanProperty(item.hugePages, "") }
    val hugePagesJitProp = bind { SimpleBooleanProperty(item.hugePagesJit, "") }
    val hwAesProp = bind { SimpleBooleanProperty(item?.hwAes, "") }
    val priorityProp = bind { SimpleIntegerProperty(item?.priority, "") }
    val memoryPoolProp = bind { SimpleBooleanProperty(item.memoryPool, "") }
    val yieldProp = bind { SimpleBooleanProperty(item.yield, "") }
    val maxThreadsHintProp = bind { SimpleIntegerProperty(item.maxThreadsHint, "") }
    val asmProp = bind { SimpleStringProperty(item.asm, "") }
    val argon2ImplProp = bind { SimpleStringProperty(item?.argon2Impl, "") }
    val astrobwtMaxSizeProp = bind { SimpleIntegerProperty(item.astrobwtMaxSize, "") }
    val astrobwtAvx2Prop = bind { SimpleBooleanProperty(item.astrobwtAvx2, "") }


    init {
        if (data != null) {
            sync()
        }
    }

    fun sync() {
        enabledProp.value = item.enabled
        hugePagesProp.value = item.hugePages
        hugePagesJitProp.value = item.hugePagesJit
        hwAesProp.value = item.hwAes
        priorityProp.value = item.priority
        memoryPoolProp.value = item.memoryPool
        yieldProp.value = item.yield
        maxThreadsHintProp.value = item.maxThreadsHint
        asmProp.value = item.asm.toString()
        argon2ImplProp.value = item.argon2Impl
        astrobwtMaxSizeProp.value = item.astrobwtMaxSize
        astrobwtAvx2Prop.value = item.astrobwtAvx2
    }

    override fun onCommit() {
        with (item) {
            enabled = enabledProp.value
            hugePages = hugePagesProp.value
            hugePagesJit = hugePagesJitProp.value
            hwAes = hwAesProp.value
            priority = priorityProp.value
            memoryPool = memoryPoolProp.value
            `yield` = yieldProp.value
            maxThreadsHint = maxThreadsHintProp.value
            asm = if (asmProp.value == "true") {
                true
            } else if (asmProp.value == "false") {
                false
            } else {
                asmProp.value
            }
            argon2Impl = argon2ImplProp.value
            astrobwtMaxSize = astrobwtMaxSizeProp.value
            astrobwtAvx2 = astrobwtAvx2Prop.value
        }
    }
}