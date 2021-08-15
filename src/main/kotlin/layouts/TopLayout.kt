package layouts
import javafx.geometry.HPos
import javafx.geometry.Pos
import javafx.geometry.VPos
import tornadofx.*

class TopLayout:View() {
    override val root = hbox(20){

        style {
            padding = box(10.px)
        }
        text("XMRig Made Easy") {
            style {
                fontSize = 22.px
            }
        }
        text("version 1.0.0") {
            style {
                fontSize = 12.px
            }
        }
    }
}