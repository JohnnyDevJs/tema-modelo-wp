<?php

/**
 * Helpers Theme.
 *
 * @package modelo
 */

function modelo_cc_mime_types( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';

    return $mimes;
}

function modelo_active_header_menu( $classes, $item ) {

    if ( in_array( 'current-menu-item', $classes ) ) {
        $classes[] = 'active';
    }

    return $classes;
}

function modelo_wp_deregister_styles() {
    wp_dequeue_style( 'wp-block-library' );
}