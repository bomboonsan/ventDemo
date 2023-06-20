<?php
/**
 * Twenty Twenty-Two functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Two
 * @since Twenty Twenty-Two 1.0
 */


if ( ! function_exists( 'twentytwentytwo_support' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_support() {

		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );

	}

endif;

add_action( 'after_setup_theme', 'twentytwentytwo_support' );

if ( ! function_exists( 'twentytwentytwo_styles' ) ) :

	/**
	 * Enqueue styles.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_styles() {
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );

		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style(
			'twentytwentytwo-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'twentytwentytwo-style' );

	}

endif;

add_action( 'wp_enqueue_scripts', 'twentytwentytwo_styles' );

// Add block patterns
require get_template_directory() . '/inc/block-patterns.php';




//

/*
 * Create a custom page template for displaying user profiles.
 */
add_action( 'template_redirect', function()
{
    if ( is_page_template( 'user-profile.php' ) )
    {
        /*
         * Load the ACF plugin.
         */
        if ( ! function_exists( 'acf_init' ) )
        {
            require_once 'advanced-custom-fields/acf.php';
        }

        /*
         * Get the user's profile data.
         */
        $user = wp_get_current_user();

        /*
         * Loop through the ACF fields and display them on the page.
         */
        foreach ( acf_get_fields( 'user_profile' ) as $field )
        {
            echo '<h2>' . $field['label'] . '</h2>';
            echo '<p>' . esc_html( $user->$field['name'] ) . '</p>';
        }
    }
});


function theme_setup()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'theme_setup');

function enqueue_scripts()
{
    wp_enqueue_style('style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

function custom_login_logo()
{
    echo '<style type="text/css">
        h1 a { background-image: url(' . get_stylesheet_directory_uri() . '/images/logo.png) !important; }
    </style>';
}
add_action('login_head', 'custom_login_logo');

function custom_login_logo_url()
{
    return home_url();
}
add_filter('login_headerurl', 'custom_login_logo_url');

function custom_login_logo_url_title()
{
    return get_bloginfo('name');
}
add_filter('login_headertitle', 'custom_login_logo_url_title');

function modify_user_contact_methods($user_contact)
{
    $user_contact['twitter'] = __('Twitter Username');
    $user_contact['facebook'] = __('Facebook Username');
    return $user_contact;
}
add_filter('user_contactmethods', 'modify_user_contact_methods');

// Add ACF fields to user profile
function add_user_profile_acf_fields()
{
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_user_profile',
            'title' => 'User Profile',
            'fields' => array(
                array(
                    'key' => 'field_first_name',
                    'label' => 'First Name',
                    'name' => 'first_name',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => false,
                    'conditional_logic' => 0,
                ),
                array(
                    'key' => 'field_last_name',
                    'label' => 'Last Name',
                    'name' => 'last_name',
                    'type' => 'text',
                    'instructions' => '',
                    'required' => false,
                    'conditional_logic' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'user_form',
                        'operator' => '==',
                        'value' => 'all',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => true,
            'description' => '',
        ));
    }
}
add_action('acf/init', 'add_user_profile_acf_fields');




// Short Code
function user_profile_shortcode()
{
    ob_start();

    $current_user = wp_get_current_user();

    if ($current_user->ID == 0) {
        echo '<p>Please login to view your profile.</p>';
    } else {
        ?>


                <div class="entry-content">
                    <p><strong>Username:</strong> <?php echo $current_user->user_login; ?></p>
                    <p><strong>Email:</strong> <?php echo $current_user->user_email; ?></p>

                    <h2>Edit Profile</h2>

                   <?php
                        if (isset($_POST['submit'])) {
                            // Update ACF field
                            update_field('first_name', sanitize_text_field($_POST['first_name']), 'user_' . $current_user->ID);
                            update_field('last_name', sanitize_text_field($_POST['last_name']), 'user_' . $current_user->ID);
                            update_field('demo', sanitize_text_field($_POST['demo']), 'user_' . $current_user->ID);

                            echo '<div class="updated"><p>Your profile has been updated.</p></div>';
                        }
                        ?>

                    <form method="post">
                        <p>
                            <label for="first_name">First Name:</label>
                            <input type="text" name="first_name" value="<?php echo esc_attr(get_field('first_name', 'user_' . $current_user->ID)); ?>">
                        </p>
                        <p>
                            <label for="last_name">Last Name:</label>
                            <input type="text" name="last_name" value="<?php echo esc_attr(get_field('last_name', 'user_' . $current_user->ID)); ?>">
                        </p>
                        <p>
                            <label for="demo">Demo:</label>
                                <input type="text" name="demo" value="<?php echo esc_attr(get_field('demo', 'user_' . $current_user->ID)); ?>">
                        </p>
                        <p><input type="submit" name="submit" value="Update Profile"></p>
                    </form>
                </div>

        <?php
    }

    return ob_get_clean();
}
add_shortcode('user_profile', 'user_profile_shortcode');