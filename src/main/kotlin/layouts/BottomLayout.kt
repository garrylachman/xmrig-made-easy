package layouts
import components.EventLog
import javafx.beans.property.SimpleDoubleProperty
import tornadofx.*

class BottomLayout:View() {
    val eventLog: EventLog by inject()

    override val root = pane() {
        add(eventLog)
    }
}