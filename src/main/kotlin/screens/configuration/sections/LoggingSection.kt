package screens.configuration.sections

import models.XMRigConfigModel
import tornadofx.*

class LoggingSection(configModel: XMRigConfigModel) : View("Logging Section") {

    override val root = gridpane {
        row {
            text("Logging") {
                style {
                    fontSize = 18.px
                }
            }
        }
        row {
            form {
                fieldset {
                    field("Colors") {
                        label {
                            prefWidth = 20.0
                        }
                        checkbox("", configModel.colorsProp)
                        tooltip("Enable or disable colored output.")
                    }
                    field("Health Print Time") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.healthPrintTimeProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Print health report every specified number of seconds.")
                    }
                    field("Verbose") {
                        label {
                            prefWidth = 20.0
                        }
                        textfield(configModel.verboseProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Set number above 0 to increase log verbosity.")
                    }
                }
            }
            form {
                fieldset {
                    field("Syslog") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.sysLogProp)
                        tooltip("Use system log for output messages. This option is ignored on Windows.")
                    }
                    field("Print Time") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.printTimeProp) {
                            stripNonNumeric()
                            required()
                        }
                        tooltip("Print hashrate report every specified number of seconds.")
                    }
                    field("Log File") {
                        label {
                            prefWidth = 35.0
                        }
                        textfield(configModel.logFileProp)
                        tooltip("Log all output to specified file.\nDue limitations of JSON format Windows directory separator should be escaped like \\\\ or written in Unix style like /.")
                    }
                }
            }
        }
        constraintsForColumn(0).percentWidth = 50.0
        constraintsForColumn(1).percentWidth = 50.0
    }

}
