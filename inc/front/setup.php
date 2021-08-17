<?php

/**
 * Setup Theme.
 *
 * @package modelo
 */

function modelo_setup_theme() {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'custom-logo' );
    register_nav_menu( 'header_menu', __( 'Header Menu', 'modelo' ) );
}