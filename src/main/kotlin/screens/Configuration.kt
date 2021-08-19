package screens

import javafx.geometry.Pos
import javafx.scene.layout.Border
import models.SingleData
import screens.configuration.sections.*
import tornadofx.*

class Configuration : View("Configuration") {
    val configModel = SingleData.config
    val miscSection = MiscSection(configModel)
    val loggingSection = LoggingSection(configModel)
    val apiSection = APISection(configModel)
    val randomXSection = RandomXSection(configModel)
    val cpuSection = CPUSection(configModel)

    override val root = scrollpane(fitToWidth = true) {
        edgeToEdge = true

        vbox() {
            add(miscSection)
            add(loggingSection)
            add(apiSection)
            add(randomXSection)
            add(cpuSection)
        }
    }




        /*gridpane {
        add(miscSection)

        row {
            form {
                field("Donate Level") {
                    textfield(configModel.donateLevelProp) {
                        stripNonNumeric()
                        required()
                    }
                    tooltip("Donate level percentage. Official binaries don't allow donation level below 1%. If you like zero donation you must edit donate.h file and recompile the miner from source.")
                }


            }
            form {
                fieldset() {


                    field("Donate Over Proxy") {
                        textfield(configModel.donateOverProxyProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Donate over xmrig-proxy.")
                    }


                }
            }
        }
        //constraintsForColumn(0).percentWidth = 50.0
        //constraintsForColumn(1).percentWidth = 50.0
    }*/


}
