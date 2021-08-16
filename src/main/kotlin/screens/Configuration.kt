package screens

import javafx.geometry.Pos
import models.SingleData
import tornadofx.*

class Configuration : View("Configuration") {
    val configModel = SingleData.config

    override val root = gridpane {
        row {
            text("General") {
                style {
                    fontSize = 22.px
                    padding = box(10.px)
                }
            }
        }
        row {
            form {
                fieldset() {
                    field("Autosave") {
                        checkbox("", configModel.autosaveProp) {
                            action {
                                configModel.commit()
                                println(configModel.item)
                            }
                        }
                    }
                    field("Background") {
                        checkbox("", configModel.backgroundProp)
                    }
                    field("Donate Level") {
                        textfield(configModel.donateLevelProp)
                    }
                }
            }
            form {
                fieldset() {
                    field("Title") {
                        checkbox("", configModel.titleProp)
                    }
                    field("Colors") {
                        checkbox("", configModel.colorsProp)
                    }
                    field("Donate Over Proxy") {
                        textfield(configModel.donateOverProxyProp)
                    }
                }
            }
        }
        constraintsForColumn(0).percentWidth = 50.0
        constraintsForColumn(1).percentWidth = 50.0
    }


}
