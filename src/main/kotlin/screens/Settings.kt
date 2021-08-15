package screens
import com.beust.klaxon.Klaxon
import javafx.beans.property.SimpleDoubleProperty
import javafx.stage.FileChooser
import models.SettingsModel
import models.XMRigConfigModel
import tornadofx.*

class Settings() :View() {
    private val model = SettingsModel()

    override val root = vbox {
        text("Settings") {
            style {
                fontSize = 22.px
            }
        }
        separator {
            style {
                paddingBottom = 10.0
            }
        }
        form {
            fieldset("Paths") {
                field("Working Directory") {
                    textfield(model.workingDir)
                    button("Choose") {
                        action {
                            val d = chooseDirectory {  }
                            if (d != null && d.isDirectory) {
                                model.workingDir.set(d.absolutePath)
                                model.commit()
                            }
                        }
                    }
                }

                field("XMRig Binary") {
                    textfield(model.xmrigBinaryPath)
                    button("Choose") {
                        action {
                            val fileChooser = FileChooser();
                            val file = fileChooser.showOpenDialog(null)

                            if (file != null && file.isFile) {
                                model.xmrigBinaryPath.set(file.absolutePath)
                                model.commit()
                            }
                        }
                    }
                }

                field("Config File Name") {
                    textfield(model.configFileName)
                    button("Load") {
                        action {
                            var configFile = StringBuilder().append(model.workingDir.value).append("/").append(model.configFileName.value);
                            var configModel = XMRigConfigModel(configFile.toString())
                            println(configModel.item)
                            println(Klaxon().toJsonString(configModel.item))
                            println(configModel.item.api.id)
                            //configModel.item.api.id = "new ID"
                            println(configModel.item.api.id)
                            configModel.commit()
                        }
                    }
                }

            }
        }
    }

}