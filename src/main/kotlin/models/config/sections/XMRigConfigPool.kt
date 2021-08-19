package models.config.sections

import com.beust.klaxon.Json
import helpers.MixedTypes
import javafx.beans.property.SimpleBooleanProperty
import javafx.beans.property.SimpleIntegerProperty
import javafx.beans.property.SimpleStringProperty
import tornadofx.ItemViewModel

data class XMRigConfigPool(
    var enabled: Boolean = true,
    @Json(name = "huge-pages")
    var hugePages: Boolean = true,
    @Json(name = "huge-pages-jit")
    var hugePagesJit: Boolean = false,
    @Json(name = "hw-aes")
    var hwAes: Any? = null,
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

class XMRigConfigPoolModel(data:XMRigConfigCPU? = null) : ItemViewModel<XMRigConfigCPU>(data) {
    val enabledProp = bind { SimpleBooleanProperty(item.enabled, "") }
    val hugePagesProp = bind { SimpleBooleanProperty(item.hugePages, "") }
    val hugePagesJitProp = bind { SimpleBooleanProperty(item.hugePagesJit, "") }
    val hwAesProp = bind { SimpleStringProperty(item?.hwAes, "") }
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
        hwAesProp.value = MixedTypes.mixedTypeToStringAutoDetect(item.hwAes)
        priorityProp.value = item.priority
        memoryPoolProp.value = item.memoryPool
        yieldProp.value = item.yield
        maxThreadsHintProp.value = item.maxThreadsHint
        asmProp.value =  MixedTypes.mixedTypeToString(item.asm)
        argon2ImplProp.value = MixedTypes.mixedTypeToStringAutoDetect(item.argon2Impl)
        astrobwtMaxSizeProp.value = item.astrobwtMaxSize
        astrobwtAvx2Prop.value = item.astrobwtAvx2
    }

    override fun onCommit() {
        with (item) {
            enabled = enabledProp.value
            hugePages = hugePagesProp.value
            hugePagesJit = hugePagesJitProp.value
            hwAes =  MixedTypes.stringToMixedType(hwAesProp.value) as Any
            priority = priorityProp.value
            memoryPool = memoryPoolProp.value
            `yield` = yieldProp.value
            maxThreadsHint = maxThreadsHintProp.value
            asm =  MixedTypes.stringToMixedType(asmProp.value) as Any
            argon2Impl = MixedTypes.stringToMixedType(argon2ImplProp.value) as String
            astrobwtMaxSize = astrobwtMaxSizeProp.value
            astrobwtAvx2 = astrobwtAvx2Prop.value
        }
    }
}