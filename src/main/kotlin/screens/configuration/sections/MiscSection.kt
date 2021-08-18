package screens.configuration.sections

import models.XMRigConfigModel
import tornadofx.*

class MiscSection(configModel: XMRigConfigModel) : View("Misc Section") {

    override val root = gridpane {
        row {
            text("Misc") {
                style {
                    fontSize = 18.px
                }
            }
        }
        row {
            form {
                fieldset {
                    field("Autosave") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.autosaveProp)
                        tooltip("Enable or disable automatic config save if new mining profiles are generated.")
                    }
                    field("Title") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.titleProp)
                        tooltip("This option controls the title of the console window on Windows")
                    }

                    field("Pause on Active") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.pauseOnActiveProp)
                        tooltip("Enable or disable pause mine when the user is active.\nOptionally this option accepts a number of seconds, if the user is away for more than specified number of seconds mine will resume,\ntrue equals to 60 seconds. This option is supported on Windows and macOS.")
                    }
                }
            }
            form {
                fieldset {
                    field("Background") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.backgroundProp)
                        tooltip("Run XMRig in the foreground or background")
                    }
                    field("DMI") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.dmiProp)
                        tooltip("Enable or disable DMI/SMBIOS reader.")
                    }
                }
            }
            form {
                fieldset {
                    field("Watch") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.watchProp)
                        tooltip("Enable or disable config file watching.\nIf this feature enabled and config file was changed on disk the miner will reload config.")
                    }
                    field("Pause on Battery") {
                        label {
                            prefWidth = 35.0
                        }
                        checkbox("", configModel.pauseOnBatteryProp)
                        tooltip("Enable or disable pause mine on battery power.")
                    }
                }
            }
        }
        constraintsForColumn(0).percentWidth = 33.333
        constraintsForColumn(1).percentWidth = 33.333
        constraintsForColumn(2).percentWidth = 33.333
    }

}
