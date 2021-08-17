<?php
    /**
     * Custom Search Form.
     *
     * @package modelo
     */
?>

<form role="search" method="get" class="form-inline my-2 my-lg-0" action="<?php echo esc_url( home_url( '/' ) ); ?>">
  <span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'modelo' ); ?></span>
  <input class="form-control mr-sm-2" type="search"
    placeholder="<?php echo esc_attr_x( 'Search', 'placeholder', 'modelo' ); ?>" value="<?php the_search_query();?>"
    aria-label="Search" name="s">
  <button class="btn btn-outline-success my-2 my-sm-0"
    type="submit"><?php echo esc_attr_x( 'Search', 'submit button', 'modelo' ); ?></button>
</form>