package screens.configuration.sections

import models.XMRigConfigModel
import tornadofx.*

class NetworkSection(configModel: XMRigConfigModel) : View("Network Section") {

    override val root = gridpane {
        row {
            text("Network") {
                style {
                    fontSize = 18.px
                }
            }
        }
        row {
            form {
                fieldset {
                    field("Retries") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.retriesProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Number of times to retry before switching to a backup pool.")
                    }
                    field("Donate Level") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.donateLevelProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Donate level percentage. Official binaries don't allow donation level below 1%.")
                    }
                    field("User Agent") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.userAgentProp)
                        tooltip("Set custom user-agent string for pool.")
                    }
                }
            }
            form {
                fieldset {
                    field("Retries Pause") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.retryPauseProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Time to pause in seconds between retries.")
                    }
                    field("Donate Over Proxy") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.donateOverProxyProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Donate over xmrig-proxy.")
                    }
                    field("TLS") {
                        label {
                            prefWidth = 20.0
                        }
                        checkbox("", configModel.tlsProp)
                        tooltip("Enable or disable SSL/TLS for incoming API connections.")
                    }
                }
            }
        }
        constraintsForColumn(0).percentWidth = 50.0
        constraintsForColumn(1).percentWidth = 50.0
    }

}
