<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;

class FilterDamage extends Filter
{

    /**
     * Filter the products by the given year.
     *
     * @param  string|null  $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function year(string $value = null): Builder
    {
        return $this->builder->whereYear('created_at', $value);
    }
}
