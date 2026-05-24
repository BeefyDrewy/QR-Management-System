/**
 * Database Layer - Pure Supabase CRUD Operations
 * 
 * This module handles ALL direct communication with Supabase.
 * NO DOM manipulation allowed here.
 * 
 * Exported functions:
 * - fetchAllVolunteers()
 * - addNewVolunteer(volunteerData)
 */

import { supabase } from './supabaseClient.js';

/**
 * Fetch all volunteers from the database
 * @returns {Promise<{success: boolean, data: Array, error: string|null}>}
 */
export async function fetchAllVolunteers() {
  try {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to load volunteers'
      };
    }

    return {
      success: true,
      data: data || [],
      error: null
    };
  } catch (err) {
    console.error('Fetch volunteers error:', err);
    return {
      success: false,
      data: [],
      error: err.message || 'Network error while fetching volunteers'
    };
  }
}

/**
 * Add a new volunteer to the database
 * @param {Object} volunteerData - The volunteer object to insert
 * @returns {Promise<{success: boolean, data: Object, error: string|null}>}
 */
export async function addNewVolunteer(volunteerData) {
  try {
    // Validate required fields
    if (!volunteerData['first name'] || !volunteerData.name || !volunteerData['ID number']) {
      return {
        success: false,
        data: null,
        error: 'Please fill in all required fields (first name, surname, ID number)'
      };
    }

    const { data, error } = await supabase
      .from('volunteers')
      .insert([volunteerData]);

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to add volunteer'
      };
    }

    return {
      success: true,
      data: data,
      error: null
    };
  } catch (err) {
    console.error('Add volunteer error:', err);
    return {
      success: false,
      data: null,
      error: err.message || 'Error adding volunteer'
    };
  }
}

console.log('Database module loaded');