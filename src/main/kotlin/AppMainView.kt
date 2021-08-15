import layouts.BottomLayout
import layouts.ContentLayout
import layouts.TopLayout
import tornadofx.*

class AppMainView: View() {
    override val root = borderpane {
        top<TopLayout>()
        center<ContentLayout>()
        bottom<BottomLayout>()
        prefWidth = 800.0
        prefHeight = 600.0

    }
}