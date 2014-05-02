require 'test_helper'

class MemoryControllerTest < ActionController::TestCase
  test "should get memory" do
    get :memory
    assert_response :success
  end

end
