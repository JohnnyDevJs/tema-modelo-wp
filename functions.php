<?php

/**
 * Functions Theme.
 *
 * @package modelo
 */

define( 'MODELO_DEV_MODE', true );

// Includes
include get_theme_file_path( '/inc/front/enqueue.php' );
include get_theme_file_path( '/inc/setup.php' );
include get_theme_file_path( '/inc/helpers.php' );

// Hooks
add_action( 'wp_enqueue_scripts', 'modelo_enqueue' );
add_action( 'after_setup_theme', 'modelo_setup_theme' );
add_filter( 'upload_mimes', 'mc_cc_mime_types' );
add_filter( 'nav_menu_css_class', 'modelo_active_header_menu', 10, 2 );
add_action( 'wp_print_styles', 'modelo_wp_deregister_styles', 100 );