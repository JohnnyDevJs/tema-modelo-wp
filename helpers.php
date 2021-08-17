<?php

// Helpers
function mc_cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

function mc_active_header_menu($classes, $item){
    if( in_array('current-menu-item', $classes) ){
        $classes[] = 'mc_header_menu_active';
    }
    return $classes;
}

function mc_wp_deregister_styles() {
    wp_dequeue_style( 'wp-block-library' );
}
