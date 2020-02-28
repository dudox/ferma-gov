<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DamageStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('damage_statuses')->insert([
            [
                'name' => 'Pending',
                'description' => 'Damage Entry yet to be processed',
                'color_code' => 'text-warning',
                'icon' => 'nc nc-circle',
            ],
            [
                'name' => 'Ongoing',
                'description' => 'Damage Entry is been processed and repair is ongoing',
                'color_code' => 'text-info',
                'icon' => 'nc nc-spaceship',
            ],
            [
                'name' => 'Completed',
                'description' => 'Damage Entry has been processed successfully',
                'color_code' => 'text-success',
                'icon' => 'nc nc-check-2',
            ],
            [
                'name' => 'Failed',
                'description' => 'Damage Entry was not processed successfully',
                'color_code' => 'text-danger',
                'icon' => 'nc nc-simple-remove',
            ],
        ]);
    }
}
