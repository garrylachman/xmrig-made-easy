package screens.configuration.sections

import javafx.collections.FXCollections
import javafx.geometry.Orientation
import javafx.geometry.VPos
import javafx.geometry.VerticalDirection
import models.XMRigConfigModel
import tornadofx.*

class RandomXSection(configModel: XMRigConfigModel) : View("RandomX Section") {

    override val root = gridpane {
        row {
            text("Random X") {
                style {
                    fontSize = 18.px
                }
            }
        }
        row {
            form {
                fieldset {
                    field("Init") {
                        label {
                            prefWidth = 47.0
                        }
                        textfield(configModel.randomXModel.initRandomXProp) {
                            stripNonInteger()
                            required()
                        }
                        tooltip("Thread count to initialize RandomX dataset. Auto-detect (-1) or number of threads.")
                    }
                    field("Mode") {
                        label {
                            prefWidth = 47.0
                        }
                        combobox<String>(configModel.randomXModel.modeProp) {
                            items = FXCollections.observableArrayList("auto", "fast", "light")
                        }
                        tooltip("RandomX mining mode: \"auto\", \"fast\" (2 GB memory), \"light\" (256 MB memory).")
                    }
                    field("rdmsr") {
                        label {
                            prefWidth = 47.0
                        }
                        checkbox("", configModel.randomXModel.rdmsrProp)
                        tooltip("Restore MSR register values to their original values on exit. Used together with wrmsr.")
                    }
                    field("Cache QOS") {
                        label {
                            prefWidth = 47.0
                        }
                        checkbox("", configModel.randomXModel.cache_qosProp)
                        tooltip("Enable or disable Cache QoS. It's useful when you can't or don't want to mine on all CPU cores to make mining hashrate more stable.")
                    }

                    field("Numa") {
                        label {
                            prefWidth = 47.0
                        }
                        checkbox("", configModel.randomXModel.numaProp)
                        tooltip("Enable or disable NUMA support (better hashrate on multi-CPU servers and Ryzen Threadripper).")
                    }

                }
            }
            form {
                fieldset {
                    field("Init AVX2") {
                        label {
                            prefWidth = 28.0
                        }
                        textfield(configModel.randomXModel.initAvx2Prop) {
                            stripNonInteger()
                            required()
                        }
                        tooltip("Use AVX2 for dataset initialization.\nFaster on some CPUs. Auto-detect (-1), disabled (0),\nalways enabled on CPUs that support AVX2 (1).")
                    }
                    field("Scratchpad") {
                        label {
                            prefWidth = 28.0
                        }
                        textfield(configModel.randomXModel.scratchpad_prefetch_modeProp) {
                            stripNonInteger()
                            required()
                        }
                        tooltip("Which instruction to use in RandomX loop to prefetch data from scratchpad.\n1 is default and fastest in most cases.\nCan be off (0), prefetcht0 instruction (1),\nprefetchnta instruction (2, a bit faster on Coffee Lake and a few other CPUs),\nmov instruction (3).")
                    }
                    field("wrmsr") {
                        label {
                            prefWidth = 28.0
                        }
                        checkbox("", configModel.randomXModel.wrmsrProp)
                        tooltip("Enable or disable MSR mod. It gives up to 15% speedup depending on your system.")
                    }
                    field("1GB Pages") {
                        label {
                            prefWidth = 28.0
                        }
                        checkbox("", configModel.randomXModel.oneGBPagesProp)
                        tooltip("Use 1GB hugepages for RandomX dataset (Linux only). It gives 1-3% speedup.")
                    }


                }
            }
        }
        constraintsForColumn(0).percentWidth = 50.0
        constraintsForColumn(1).percentWidth = 50.0
    }

}
