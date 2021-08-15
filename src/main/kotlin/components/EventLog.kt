package components
import javafx.beans.property.SimpleDoubleProperty
import tornadofx.*

class EventLog() :View() {
    override val root = drawer {
        prefHeight = 150.0
        widthProperty().addListener { e -> fitToParentWidth() }

        item("Event Log", expanded = true) {
            textarea {
            }
        }
        item("Errors") {
            textarea {
            }
        }
    }
}