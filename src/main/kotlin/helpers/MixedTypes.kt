package helpers

object MixedTypes {
    fun mixedTypeToString(data:Any?) = when(data) {
        null -> "null"
        is String -> data.toString()
        is Boolean -> if (data == true)  "true" else "false"
        else -> "null"
    }

    fun mixedTypeToStringAutoDetect(data:Any?) = when(data) {
        null -> "auto-detect"
        is String -> data.toString()
        is Boolean -> if (data == true)  "true" else "false"
        else -> "null"
    }

    fun stringToMixedType(data:String) = when (data) {
        "true" -> true
        "false" -> false
        "null" -> null
        "auto-detect" -> null
        else -> data
    }
}