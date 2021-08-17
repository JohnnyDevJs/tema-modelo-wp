<?php

// Setup
function mc_setup_theme()
{
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    register_nav_menu('mc_header_menu', __('Magnificat Header Menu', 'mc'));
}