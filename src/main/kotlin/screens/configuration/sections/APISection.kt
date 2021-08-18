package screens.configuration.sections

import javafx.geometry.Orientation
import javafx.geometry.VPos
import javafx.geometry.VerticalDirection
import models.XMRigConfigModel
import tornadofx.*

class APISection(configModel: XMRigConfigModel) : View("API Section") {

    override val root = gridpane {
        row {
            text("API / HTTP") {
                style {
                    fontSize = 18.px
                }
            }
        }
        row {
            form {
                fieldset {
                    field("API Id") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.apiModel.idProp)
                        tooltip("Instance ID for API")
                    }
                    field("HTTP Enabled") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.httpModel.enabledProp)
                        tooltip("Enable or disable HTTP API.")
                    }
                    field("Port") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.httpModel.portProp) {
                            stripNonInteger()
                            required()
                            enableWhen(configModel.httpModel.enabledProp)
                        }
                        tooltip("Bind port. Default value 0 is a valid option but not too useful because\nthe API will bind to a random port on each start, \nyou must choose the port.")
                    }
                    field("Access Token") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.httpModel.accessTokenProp) {
                            enableWhen(configModel.httpModel.enabledProp)
                        }
                        tooltip("Access token.")
                    }
                }
            }
            form {
                fieldset {
                    field("Worker Id") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.apiModel.workerIdProp)
                        tooltip("Worker ID, hostname if not specified.")
                    }
                    field {
                        text(" ")
                    }
                    field("Host") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.httpModel.hostProp) {
                            enableWhen(configModel.httpModel.enabledProp)
                        }
                        tooltip("Bind host (IP address) for HTTP API. Common useful options:\n" +
                                "127.0.0.1 - access from local computer only.\n" +
                                "0.0.0.0 - any IPv4 address.\n" +
                                ":: - any IPv4 and IPv6 address.")
                    }
                    field("Restricted") {
                        label {
                            prefWidth = 35.0
                        }
                        style {
                            paddingTop = 10.0
                        }
                        checkbox("", configModel.httpModel.restrictedProp) {
                            enableWhen(configModel.httpModel.enabledProp)
                            style {

                            }
                        }
                        tooltip("Enable (only if access token set) or disable full access to HTTP API.")
                    }
                }
            }
        }
        constraintsForColumn(0).percentWidth = 50.0
        constraintsForColumn(1).percentWidth = 50.0
    }

}
