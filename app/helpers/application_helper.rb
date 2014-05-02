module ApplicationHelper
  def active?(link)
    'active' if controller_name == link.to_s
  end
end
