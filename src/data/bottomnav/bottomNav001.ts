import { c } from "../types";
import { STUB } from "../components";

export const bottomNav001 = c({
  slug: "bottom-nav-001",
  name: "Bottom Navigation 001",
  category: "navigation",
  description: "Floating pill bottom navigation with gradient border.",
  isNew: false,
  featured: true,
  previewMedia: {
    day: "/images/bottomnav001-day.png",
    night: "/images/bottomnav001-night.png",
  },
  frameworks: {
    compose: {
      component: 
      `@Composable
fun BottomNav001(
    navController: NavHostController,
    navItems: List<NavItem> = listOf(
        NavItem("home_page", Icons.Filled.Home, "home"),
        NavItem("add_page", Icons.Filled.Add, "add"),
        NavItem("profile_page", Icons.Filled.Person, "profile"),
        NavItem("fvt_page", Icons.Filled.FavoriteBorder, "fvt"),
    ),
    modifier: Modifier = Modifier,
    itemSize: Int = 50
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "home_page"

    Row(
        modifier = modifier
            .padding(bottom = 20.dp)
            .wrapContentHeight()
            .wrapContentWidth()
            .shadow(
                elevation = 8.dp,
                shape = RoundedCornerShape(100)
            )
            .background(
                color = colorResource(R.color.bottom_nav_001_bg),
                shape = RoundedCornerShape(100)
            )
            .border(
                width = 1.5.dp,
                brush = Brush.linearGradient(
                    colors = listOf(
                        colorResource(R.color.bottom_nav_001_border).copy(alpha = 0.3f),
                        colorResource(R.color.bottom_nav_001_border).copy(alpha = 0.1f)
                    )
                ),
                shape = RoundedCornerShape(100)
            )
    ) {
        navItems.forEach { navItem ->
            NavigationBarItem(
                navItem = navItem,
                currentRoute = currentRoute,
                onclick = {
                    navController.navigate(navItem.route)
                },
                itemSize = itemSize
            )
        }
    }
}


@Composable
fun NavigationBarItem(
    navItem: NavItem,
    currentRoute: String? = null,
    onclick: () -> Unit,
    itemSize: Int = 50
) {
    val iconSize = itemSize * .5
    Box(
        modifier = Modifier
            .padding(5.dp)
            .size(itemSize.dp)
            .clip(RoundedCornerShape(100))
            .background(
                if (currentRoute == navItem.route) {
                    colorResource(R.color.bottom_nav_001_item_bg)
                } else Color.Transparent
            )
            .clickable {
                if (currentRoute != navItem.route) {
                    onclick()
                }
            },
        contentAlignment = Alignment.Center
    ) {
        Icon(
            imageVector = navItem.icon,
            contentDescription = navItem.label,
            tint = if (currentRoute == navItem.route) {
                colorResource(R.color.bottom_nav_001_item_selected_color)
            } else {
                colorResource(R.color.bottom_nav_001_item_unselected_color)
            },
            modifier = Modifier.size(iconSize.dp)
        )
    }
}
//navitem data class
data class NavItem(
    val route: String,
    val icon: ImageVector,
    val label: String
)

      `,

      imports: `import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.yooashu.yoocomponents.R //-->your package name here`,

      gradle: `implementation("androidx.navigation:navigation-compose:2.8.5")`,

      resources: {
        colorsDay: `
        <!-- res/values/colors.xml -->
        <!-- update as per your choice -->
        <color name="bottom_nav_001_text">#000000</color>
        <color name="bottom_nav_001_bg">#F5F5F5</color>
        <color name="bottom_nav_001_border">#000000</color>
        <color name="bottom_nav_001_item_bg">#000000</color>
        <color name="bottom_nav_001_item_selected_color">#F5F5F5</color>
        <color name="bottom_nav_001_item_unselected_color">#000000</color>`,

        colorsNight: `
        <!-- res/values-night/colors.xml -->
         <!-- update as per your choice -->
         <color name="bottom_nav_001_text">#FFFFFF</color>
         <color name="bottom_nav_001_border">#FFFFFF</color>
         <color name="bottom_nav_001_item_bg">#FFFFFF</color>
         <color name="bottom_nav_001_bg">#000000</color>
         <color name="bottom_nav_001_item_selected_color">#000000</color>
         <color name="bottom_nav_001_item_unselected_color">#FFFFFF</color>`,

        drawables: null,
        fonts: null,
        extras: null,
      },
      howToUse: `val navController = rememberNavController()

Scaffold(
    bottomBar = {
            Box(
                modifier = Modifier.fillMaxWidth(),
                contentAlignment = Alignment.Center
            ) {
                BottomNav001(
                    navController = navController,
                    navItems = listOf(
                        NavItem("home_page", Icons.Filled.Home, "home"),
                        NavItem("add_page", Icons.Filled.Add, "add"),
                        NavItem("profile_page", Icons.Filled.Person, "profile"),
                        NavItem("fvt_page", Icons.Filled.FavoriteBorder, "fvt"),
                    ),
                    itemSize = 50
                )
            }
        },
) { innerPadding ->

    NavHost(
        navController = navController,
        startDestination = "home_page",
        modifier = Modifier.padding(innerPadding)
    ) {
        composable("home_page") { Text("Home Page") }
        composable("profile_page") { Text("Profile Page") }
        composable("add_page") { Text("Add Page") }
        composable("fvt_page") { Text("Favourite Page") }
    }
}`,
    },
    flutter: null,
    reactNative: null,
  },
  props: [
    {
      name: "navController",
      type: "NavHostController",
      default: "-",
      description: "Controller to manage navigation between screens."
    },
    {
      name: "navItems",
      type: "List<NavItem>",
      default: "listOf(...)",
      description: "List of items to be displayed in the bottom navigation."
    },
    {
      name: "modifier",
      type: "Modifier",
      default: "Modifier",
      description: "Modifier for the bottom navigation container."
    },
    {
      name: "itemSize",
      type: "Int",
      default: "50",
      description: "Size of each navigation item in dp."
    }
  ],
  relatedSlugs: [],
});