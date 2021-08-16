package layouts
import components.EventLog
import screens.Configuration
import screens.Settings
import tornadofx.*

class ContentLayout:View() {
    val settings: Settings by inject()
    val configuration: Configuration by inject()

    override val root = drawer {

        item("Settings", expanded = true) {
            add(settings)
            style {
                padding = box(10.px)
            }
        }

        item ("Configuration") {
            add(configuration)
            style {
                padding = box(10.px)
            }
        }

        item ("Statistics") {
            style {
                padding = box(10.px)
            }
        }
    }
}