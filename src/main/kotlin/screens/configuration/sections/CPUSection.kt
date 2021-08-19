package screens.configuration.sections

import javafx.collections.FXCollections
import javafx.geometry.Orientation
import javafx.geometry.VPos
import javafx.geometry.VerticalDirection
import models.XMRigConfigModel
import tornadofx.*

class CPUSection(configModel: XMRigConfigModel) : View("API Section") {

    override val root = gridpane {
        row {
            text("CPU") {
                style {
                    fontSize = 18.px
                }
            }
        }
        row {
            form {
                fieldset {
                    field("CPU Enabled") {
                        label {
                            prefWidth = 15.0
                        }
                        checkbox("", configModel.cpuModel.enabledProp)
                        tooltip("Enable or disable CPU mining backend.")
                    }
                    field("Huge Pages") {
                        label {
                            prefWidth = 15.0
                        }
                        checkbox("", configModel.cpuModel.hugePagesProp) {
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Enable or disable huge pages support.\nOn Linux this option also accepts huge page size in kB to use custom huge page sizes\nif it is supported by hardware.")
                    }
                    field("HW AES") {
                        label {
                            prefWidth = 15.0
                        }
                        combobox<String>(configModel.cpuModel.hwAesProp) {
                            items = FXCollections.observableArrayList("auto-detect", "false", "true")
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Force enable or disable hardware AES support.\nDefault value null means miner autodetect this feature.\nUsually you don't need to change this option, this option is useful for some rare\ncases when XMRig can't detect hardware AES, but it is available.\nIf you force enable this option, but your hardware does not support it, the miner will crash.")
                    }
                    field("Memory Pool") {
                        label {
                            prefWidth = 15.0
                        }
                        checkbox("", configModel.cpuModel.memoryPoolProp) {
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Use continuous, persistent memory block for mining threads,\nuseful for preserving huge pages allocation while algorithm switching.Possible values false (feature disabled, by default) or true.")
                    }
                    field("Max Threads Hint") {
                        label {
                            prefWidth = 15.0
                        }
                        textfield(configModel.cpuModel.maxThreadsHintProp) {
                            stripNonInteger()
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        text("%")
                        tooltip("This option (was known as max-cpu-usage) is the most confusing option in the miner with many myths and legends.\nThis option is just a hint for automatic configuration and can't precisely define CPU usage.\n" +
                                "* This option has no effect if the miner already generated CPU configuration, to prevent config generation use \"autosave\":false.\n" +
                                "* Only threads count can be changed, for 1 core CPU this option has no effect, for 2 core CPU only 2 values possible 50% and 100%, for 4 cores: 25%, 50%, 75%, 100%. etc.\n" +
                                "* Your CPU may be limited by other factors, e.g. cache.")
                    }
                    field("Argon2 Impl") {
                        label {
                            prefWidth = 15.0
                        }
                        combobox<String>(configModel.cpuModel.argon2ImplProp) {
                            items = FXCollections.observableArrayList("auto-detect", "x86_64", "SSE2", "SSSE3", "XOP", "AVX2", "AVX-512F")
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Allow override automatically detected Argon2 implementation,\nthis option added mostly for debug purposes, default value null means autodetect\nOther possible values: \"x86_64\", \"SSE2\", \"SSSE3\", \"XOP\", \"AVX2\", \"AVX-512F\".\nManual selection has no safeguards - if your CPU doesn't support required instructions, the miner will crash.")
                    }
                    field("AstroBWT AVX2") {
                        label {
                            prefWidth = 15.0
                        }
                        checkbox("", configModel.cpuModel.astrobwtAvx2Prop) {
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("AstroBWT algorithm: use AVX2 code. It's faster on some CPUs and slower on other.")
                    }



                }
            }
            form {
                fieldset {
                    field {
                        text(" ")
                    }
                    field("Huge Pages JIT") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.cpuModel.hugePagesJitProp) {
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Enable or disable huge pages support for RandomX JIT code.\\nIt gives a very small boost on Ryzen CPUs, but hashrate is unstable between launches")
                    }
                    field("Priority") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.cpuModel.priorityProp) {
                            stripNonInteger()
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Mining threads priority, value from 1 (lowest priority) to 5 (highest possible priority).\nSetting priority higher than 2 can make your PC unresponsive.")
                    }
                    field("Yield") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.cpuModel.yieldProp) {
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Prefer system better system response/stability true (default value) or maximum hashrate false.\n")
                    }
                    field("ASM") {
                        label {
                            prefWidth = 35.0
                        }
                        combobox<String>(configModel.cpuModel.asmProp) {
                            items = FXCollections.observableArrayList("true", "false", "intel", "ryzen", "bulldozer")
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("Enable/configure or disable assembly optimizations.")
                    }
                    field("AstroBWT Max") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.cpuModel.astrobwtMaxSizeProp) {
                            stripNonInteger()
                            enableWhen(configModel.cpuModel.enabledProp)
                        }
                        tooltip("AstroBWT algorithm: \nskip hashes with large stage 2 size, default: 550, min: 400, max: 1200. \nOptimal value depends on your CPU.")
                    }

                }
            }
        }
        constraintsForColumn(0).percentWidth = 50.0
        constraintsForColumn(1).percentWidth = 50.0
    }

}
