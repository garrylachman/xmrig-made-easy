package screens
import com.beust.klaxon.Klaxon
import javafx.beans.property.SimpleDoubleProperty
import javafx.stage.FileChooser
import models.SingleData
import tornadofx.*

class Settings() :View() {
    private val model = SingleData.settings

    override val root = vbox {
        text("Settings") {
            style {
                fontSize = 22.px
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
                            model.commit()
                        }
                    }
                }

            }
        }
    }

}