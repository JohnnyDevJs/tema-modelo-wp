<?php

/**
 * Enqueue Theme.
 *
 * @package modelo
 */

function modelo_enqueue() {
    $uri = get_theme_file_uri();
    $version = MC_DEV_MODE ? time() : false;

    $manifest = json_decode( file_get_contents( __DIR__ . '../../../static/assets.json', true ) );
    $main = $manifest->main;

    wp_register_style( 'app-css', $uri . "/static/" . $main->css, NULL, $version );
    wp_register_script( 'app-js', $uri . "/static/" . $main->js, ['jquery'], $version, false );

    wp_enqueue_style( 'app-css' );
    wp_enqueue_script( 'app-js' );
}